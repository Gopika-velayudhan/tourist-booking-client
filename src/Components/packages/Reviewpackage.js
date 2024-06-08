import React, { useState } from 'react'
import instance from '../../axiosinterceptor/userinterrceptor'
import { toast } from 'react-toastify'

function Reviewpackage() {
    const [review,setReviews] = useState("")
    const [rating,setrating] = useState(0)


    const addReview = async()=>{
        try{
            const response = await instance.post("/api/review/reviews")
            if(response.status=== 200){
                toast.success("successfully added the review")
            }

        }catch(err){
            console.log(err);
        }
    }

  return (
    <div>

    </div>
  )
}

export default Reviewpackage