import { Link } from 'react-router'
import { Screen } from './Screen'
import { EmptyView } from './StateView'

export function NotFoundPage() {
  return (
    <Screen title="페이지를 찾을 수 없어요">
      <EmptyView
        title="없는 화면이에요"
        description="주소가 바뀌었거나 삭제된 화면이에요."
        action={
          <Link to="/" className="font-semibold text-primary">
            처음으로 가기
          </Link>
        }
      />
    </Screen>
  )
}
