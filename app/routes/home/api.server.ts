function loader({ params }: Route.LoaderArgs) {
  const parseResult = langParamsInputSchema.safeParse(params);
  if (!parseResult.success) {
    throw data('not support language', { status: 400 });
  }
  const { lang } = parseResult.data;
  const t = Translations[lang];
  return {
    title: t.title,
    topMenu: t.topMenu,
    langSwitch: t.langSwitch,
  };
}

export const Api = {
  loader,
};
