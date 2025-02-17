import { useQuery } from '@tanstack/react-query'
import { api } from '../configs/api'

function useSearchComposition(search, searchType) {
  search = search.toLowerCase()
  search = search.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  const { data: compositions, status: compositionsStatus } = useQuery({
    queryKey: [`compositions${search}`],
    queryFn: async () => {
      const response = await api.post(`/composition/search/${searchType}`, {
        search: search,
      })
      return response.data
    },
  })
  return { compositions, compositionsStatus }
}

export { useSearchComposition }
