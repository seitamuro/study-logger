import { Authenticator } from "@aws-amplify/ui-react"

export const TimerPage: React.FC = () => {
  return (
    <Authenticator>
      <div>
        <h1>Timer</h1>
        <p>Timer page content</p>
        <p>時間経過後に進捗画像アップロードするフォームを表示</p>
      </div>
    </Authenticator>
  )
}