const Error = ({ error }: { error: string }) => {
  if (error === '') return null
  return <p className="text-error mx-4">{error}</p>
}

export default Error
