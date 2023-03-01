export const download = async (req, res, next) => {
 try {
    const filePath = './uploads/test2.png'
    const fileName = 'file'
    res.download(filePath, fileName)
 } catch (error) {
    
 }
}