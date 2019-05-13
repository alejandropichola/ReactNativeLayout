import RNImageToPdf from 'react-native-image-to-pdf'
import UUID from 'react-native-uuid'

  export default base64Arr => {
  let base64Path = []
  base64Path.length = 0
  base64Arr.forEach(response => {
    base64Path.push(`data:image/jpeg;base64,${response}`)
  })
  return RNImageToPdf.createPDFbyImages({
    imagePaths: base64Path,
    name: UUID.v4()
  });
}
