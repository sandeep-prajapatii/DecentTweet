import cross from "../../assets/cross.svg";

type PostModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
const EditProfileModal = ({ isOpen, onClose }: PostModalProps) => {
  const handleUpdate = () => {
    console.log("update is clicked");
  };

  return (
    <div
      onClick={onClose}
      className={`${
        isOpen ? "flex" : "hidden"
      } justify-center  h-screen w-screen absolute top-0 left-0 bg-white bg-opacity-20`}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="bg-neutral-900 md:mt-12 mt-0  p-4 md:rounded-md rounded-none md:w-[550px] w-full h-full md:h-fit"
      >
        <button onClick={() => onClose()}>
          <img className="h-8 w-8" src={cross} alt="close" />
        </button>

        <div className=" p-2 ">
          <p className="ml-2 font-semibold">Name</p>
          <input
            type="text"
            className="w-full p-2 rounded-md bg-transparent focus:outline-none focus:border-b-2 border-neutral-700"
            placeholder="Please enter name to update"
          />
        </div>
        <div className="p-2 ">
          <p className="ml-2 font-semibold">Bio</p>
          <input
            type="text"
            className="w-full p-2 rounded-md bg-transparent focus:outline-none focus:border-b-2 border-neutral-700"
            placeholder="Please enter bio to update"
          />
        </div>
        <div className="flex items-center mt-5 mb-2">
          <button
            className="font-semibold bg-white px-3 py-1 rounded-md text-black mx-auto"
            onClick={()=>handleUpdate()}
          >
            Update Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
