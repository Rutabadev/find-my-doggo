export const parseRequestErrors = (err: any): string[] => {
  return (
    err?.response?.data?.errors?.map(({ message }: any) => message) ?? [
      err?.response?.data ?? err?.message ?? 'Server unavailable',
    ]
  )
}
