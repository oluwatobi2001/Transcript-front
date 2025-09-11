import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Student from "../components/custom/StudentProfileLayout";
import { Button } from "../components/ui/button";
import ScoreUpload from "../components/custom/ScoreUpload";
import axios from "axios";

export default function UploadIndividual() {
  const dispatch = useDispatch();
  const { selectedStudentData: data } = useSelector((st) => st.app);
  const { token } = useSelector((st) => st.user);

  const handleUploadResults = async () => {
    try {
      console.log("Starting upload...");
console.log(data)
      const response = await axios.post(
        `${import.meta.env.VITE_PUBLIC_BASE_API_URL}/api/transcript/my-transcript/${data._id}`,
        data,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      console.log("Upload successful:", response.data);
      // Optionally return data or trigger additional logic
      return response.data;
    } catch (error) {
      console.error("Error uploading results:", error);
    }
  };
  useEffect(() => {
    console.log(Student);
  }, []);

  return (
    <>
      <Student>
        <div className="w-[80%] min-w-[300px] py-14 flex flex-col ">
          <h2 className="font-bold capitalize text-OrangeOau mb-4 text-[24px]">
            Input Results
          </h2>
          <ScoreUpload handleUploadResults={handleUploadResults} />
         
        </div>
      </Student>
    </>
  );
}
