import React, { useState } from "react";
import { Button, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth_provider";

const UploadAvatar = () => {
  const [pic, setPic] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const formData = new FormData();
  const auth = useAuth();
  formData.append("profile-image", pic);
  const userToken = localStorage.getItem("userToken");
  const navigate = useNavigate();

  const clearMessages = () => {
    setSuccessMessage("");
  };

  const req = async () => {
    clearMessages();

    try {
      const { data } = await axios.post(
        "http://kzico.runflare.run/user/profile-image",
        formData,
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );
      auth.checkToken();
      setSuccessMessage("Profile image uploaded successfully.");
      console.log(data);
      setTimeout(() => {
        navigate("/Profile");
      }, 1000);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const isPictureChosen = () => {
    return pic !== null;
  };

  return (
    <div className="flexcontainer2 upldavtr">
      {successMessage && (
        <Alert severity="success" onClose={() => setSuccessMessage("")}>
          {successMessage}
        </Alert>
      )}
      <input onChange={(e) => setPic(e.target.files[0])} type="file" />
      <Button
        className="flexitem"
        type="submit"
        variant="outlined"
        onClick={req}
        disabled={!isPictureChosen()}
      >
        Upload Profile Image
      </Button>
    </div>
  );
};

export default UploadAvatar;
