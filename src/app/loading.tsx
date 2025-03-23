import { Loader2 } from 'lucide-react'

const loading = ({}) => {
  return (
    <div className="absolute top-2/4 left-2/4">
      <Loader2 className="animate-spin h-10 w-10 text-border_purple" />
    </div>
  )
}

export default loading
