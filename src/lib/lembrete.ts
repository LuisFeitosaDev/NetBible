"use client";

import { useEffect, useState } from "react";
import { sb, supabaseConfigurado } from "./grupos/supabase";
import { garantirPerfilDoProvedor, useConta } from "./conta";
import { inscreverPush, pushDisponivel } from "./push";

/**
 * O lembrete diário do devocional.
 *
 * A escolha mora na conta (`lembretes.devocional`), não no aparelho: quem liga
 * no celular recebe em todo aparelho em que tiver deixado o app avisar. Quem
 * manda é /api/avisos/devocional, uma vez por dia, e só para quem ainda não
 * fez o devocional naquele dia.
 */

export const HORA_DO_LEMBRETE = "20h";

export type EstadoDoLembrete =
  /** Sem Supabase: o app é só local, não há como avisar. */
  | "oculto"
  | "carregando"
  /** Sem conta, ou sessão anônima: o lembrete precisa saber de quem é. */
  | "sem-conta"
  /** O navegador não recebe push (no iPhone, só o app instalado recebe). */
  | "sem-suporte"
  | "bloqueado"
  | "ligado"
  | "desligado";

export function useLembreteDevocional() {
  const { usuario, anonimo, carregando } = useConta();
  const [naConta, setNaConta] = useState<boolean | null>(null);
  const [permissao, setPermissao] = useState<NotificationPermission | "sem-suporte" | null>(null);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    setPermissao(pushDisponivel() ? Notification.permission : "sem-suporte");
  }, []);

  useEffect(() => {
    if (!usuario || anonimo) return;
    let vivo = true;
    void sb()
      .from("lembretes")
      .select("devocional")
      .eq("perfil_id", usuario.id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!vivo) return;
        if (error) console.warn("lembretes:", error.message);
        setNaConta(Boolean(data?.devocional));
      });
    return () => {
      vivo = false;
    };
  }, [usuario, anonimo]);

  // A inscrição do aparelho pode mudar sozinha (o navegador a renova). Quem
  // tem o lembrete ligado e passa pelos devocionais deixa a dela em dia.
  useEffect(() => {
    if (naConta && permissao === "granted") void inscreverPush().catch(() => {});
  }, [naConta, permissao]);

  const estado: EstadoDoLembrete = !supabaseConfigurado
    ? "oculto"
    : carregando || permissao === null
      ? "carregando"
      : !usuario || anonimo
        ? "sem-conta"
        : permissao === "sem-suporte"
          ? "sem-suporte"
          : permissao === "denied"
            ? "bloqueado"
            : naConta === null
              ? "carregando"
              : // Ligado na conta mas sem permissão neste aparelho conta como
                // desligado aqui: tocar no botão pede a permissão que falta.
                naConta && permissao === "granted"
                ? "ligado"
                : "desligado";

  async function gravar(devocional: boolean) {
    const { error } = await sb()
      .from("lembretes")
      .upsert({ perfil_id: usuario!.id, devocional, atualizado_em: new Date().toISOString() });
    if (error) throw error;
    setNaConta(devocional);
  }

  async function ligar() {
    if (!usuario) return;
    setSalvando(true);
    setErro(null);
    try {
      let p = Notification.permission;
      if (p === "default") p = await Notification.requestPermission();
      setPermissao(p);
      if (p !== "granted") return;
      // A inscrição do aparelho e o lembrete apontam para o perfil; quem
      // entrou por e-mail sem nome pode ainda não ter um.
      await garantirPerfilDoProvedor();
      await inscreverPush();
      await gravar(true);
    } catch (e) {
      console.error("lembrete", e);
      setErro("Não deu para ligar agora. Tente de novo em instantes.");
    } finally {
      setSalvando(false);
    }
  }

  async function desligar() {
    setSalvando(true);
    setErro(null);
    try {
      await gravar(false);
    } catch (e) {
      console.error("lembrete", e);
      setErro("Não deu para desligar agora. Tente de novo em instantes.");
    } finally {
      setSalvando(false);
    }
  }

  return { estado, ligar, desligar, salvando, erro };
}
