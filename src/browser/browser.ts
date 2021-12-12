export const inBrowser = typeof window !== 'undefined'


type DownloadFileEventType = {
  beforeDownload?: (xhr: XMLHttpRequest) => void;
  onDownload?: (response: ProgressEvent<EventTarget>) => void;
}

export const downloadFile = (url: string, filename?: string | number, { beforeDownload, onDownload }: DownloadFileEventType = {}) => {
  if (!inBrowser) {
    console.warn("请在浏览器环境下执行")
    return
  }

  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.responseType = 'blob'
  if (typeof beforeDownload === 'function') {
    beforeDownload(xhr)
  }
  xhr.onload = function (response) {
    if (this.status === 200) {
      if (this.response.size > 0) {
        if (!this.response) {
          console.warn("数据错误")
          return
        }
        if (typeof onDownload === 'function') {
          onDownload(response)
        }

        const ext = (this.response.type.split('/')[1] || "").toLowerCase()
        const a = document.createElement('a')
        const objectUrl = window.URL.createObjectURL(this.response)
        a.href = objectUrl
        a.download = `${filename || Date.now()}${ext ? '.' + ext : ''}`
        a.click()
        window.URL.revokeObjectURL(objectUrl)
      } else {
        console.warn("未返回数据")
      }
    }
  }

  xhr.send()
}
