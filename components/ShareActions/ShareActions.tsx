import { SITE_URL } from "lib/constants"
import { useEffect, useState } from "react"

type Props = {
  url: string,
  message?: string
}

const ShareActions = ({ url, message }: Props) => {
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    if (!isCopied) return

    const timer = setTimeout(() => {
      setIsCopied(currentIsCopied => !currentIsCopied)
    }, 3000)

    return () => clearTimeout(timer)
  }, [isCopied])

  const share_url = `${SITE_URL}${url}`

  const onFacebookShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${share_url}`,
      'facebook-share-dialog',
      'width=800,height=600'
    )
  }

  const onCopyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(share_url)
        .then(() => setIsCopied(true))
        .catch(console.error)
    }
  }

  return (
    <div >
      <ol className="flex justify-between px-1">
        <li>
          <button  className="text-accent text-sm py-4 hover:underline" onClick={onFacebookShare}>Share on Facebook</button>
        </li>
        <li className="text-accent text-sm py-4 hover:underline">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://twitter.com/intent/tweet?url=${share_url}&text=${message}`}
          >
            Share on Twitter
    
          </a>
        </li>

        <li className="text-accent text-sm py-4 hover:underline">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${share_url}`}
          >
            Share on LinkedIn
    
          </a>
        </li>
      </ol>
      <button onClick={onCopyToClipboard} className="relative w-full border text-sm border-gray-200 text-gray-500 rounded-md pl-0 py-2 pr-20">
        {share_url}
        <span className="absolute top-0 right-0 bottom-0 bg-accent border border-accent mx-auto cursor-pointer text-white font-bold py-2 px-3 rounded-md rounded-l-none w-20 hover:text-accent hover:bg-white disabled:opacity-50">
          {isCopied ? 'Copied' : 'Copy'}
        </span>
      </button>
    </div>
  )
}

export default ShareActions
