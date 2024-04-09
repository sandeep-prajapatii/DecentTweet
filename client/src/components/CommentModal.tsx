import React from "react";
import cross from "../assets/cross.svg";
import pfp from "../assets/pfp/default.jpeg";
import pfp2 from "../assets/pfp/pfp1.jpeg";

type CommentModalProps = {
    onClose : ()=>void
}

const CommentModal = ({onClose}: CommentModalProps) => {
    
  return (
    <div onClick={onClose} className="flex justify-center  h-screen w-screen absolute top-0 left-0 bg-white bg-opacity-20">
      <div onClick={(event)=>event.stopPropagation()} className="bg-neutral-900 md:mt-12 mt-0  p-4 md:rounded-md rounded-none md:w-[550px] w-full h-full md:h-fit">
        <button onClick={()=>onClose()}>
            <img className="h-8 w-8" src={cross} alt="close" />
        </button>

        <div className="mt-4  flex h-full">
            <img
              className="h-10 w-10 mx-2 rounded-full"
              src={pfp}
              alt="pfp"
            />


          <div className="flex flex-col ">
            <div className="flex  gap-2 items-center">
              <p>Sandeep Prajapati</p>
              <div className="h-1 w-1 bg-neutral-300 rounded-full"></div>
              <p className="text-neutral-500">@sandeep</p>
              <div className="h-1 w-1 bg-neutral-300 rounded-full"></div>
              <p className="text-neutral-500">11h ago</p>
            </div>

            <div className="mt-2 ">
              <p>
                Hello this side sandeep prajapati how are yhou my fnoed dandfdf
                adfd fa df d fasd f df adf asd fa sdf
              </p>
            </div>

            <p className="mt-4 text-neutral-500">
              Replying to
              <span className="text-white"> @Sandeep</span>
            </p>
          </div>
        </div>
        <div className="flex mt-4">
          <img className="h-10 w-10 mx-2 rounded-full" src={pfp2} alt="close" />
          <textarea
            placeholder="Place your reply"
            className=" bg-neutral-900 placeholder:text-lg placeholder:text-neutral-400 focus:outline-none w-full h-fit resize-none"
          />
        </div>

        <div className="flex justify-end w-full mt-4">

        <button className="bg-white text-black px-4 p-1 font-semibold rounded-md"> Reply </  button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
