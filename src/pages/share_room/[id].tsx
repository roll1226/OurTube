import { useRouter } from "next/router"
const ShareRoom = () => {
  const router = useRouter()
  const { id } = router.query

  return <p>{id}</p>
}

export default ShareRoom
