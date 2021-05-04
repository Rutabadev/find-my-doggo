export const removeEmptyAttributes = (obj: any): any => {
  return Object.entries(obj)
    .filter(([, value]) => value !== '')
    .reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {})
}

export const handleFormErrors = (
  context: {
    fieldErrors: string[]
    globalErrors: string[]
    $nextTick: (fn: () => void) => void
  },
  error: { response: { data: { message: any } }; message: string }
) => {
  if (!error?.response?.data?.message) {
    context.globalErrors = [error.message]
    return
  }
  // Clear errors and reset them in the next tick to force transition again
  context.fieldErrors = []
  context.globalErrors = []
  context.$nextTick(() => {
    Array.isArray(error.response.data.message)
      ? (context.fieldErrors = error.response.data.message)
      : (context.globalErrors = [error.response.data.message])
  })
}

export const debounce = (fn: (...params: any) => void, delay: number) => {
  let timeout: NodeJS.Timeout
  return (...args: any) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
