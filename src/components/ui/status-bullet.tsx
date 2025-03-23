export default function StatusBullet({ status }: { status: 'error' | 'success' | 'warning' }) {
  if (status === 'success') return <div className={`h-1.5 w-1.5 rounded-full bg-success`} />
  if (status === 'error') return <div className={`h-1.5 w-1.5 rounded-full bg-error`} />
  if (status === 'warning') return <div className={`h-1.5 w-1.5 rounded-full bg-warning`} />
}
