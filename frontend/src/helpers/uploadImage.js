

const url=`https://api.cloudinary.com/v1_1/duhcgl9sn/image/upload`
const uploadImage=async(image)=>{
    //const cloud_url=process.env.CLOUDNARY_NAME;
    //console.log("cloud_url",cloud_url)
    const formData=new FormData()
    formData.append("file",image)
    formData.append("upload_preset","mern_product")

 const dataResponse=await fetch(url,{
    method:"post",
    body:formData,
 })
 return dataResponse.json()
}
export default uploadImage