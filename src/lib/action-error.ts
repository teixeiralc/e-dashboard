export default function actionError(err: unknown): { data: null; ok: false; error: string } {
  if (err instanceof Error) {
    return {
      ok: false,
      error: err.message,
      data: null,
    }
  } else {
    return {
      ok: false,
      error: 'Ocorreu um erro inesperado.',
      data: null,
    }
  }
}
