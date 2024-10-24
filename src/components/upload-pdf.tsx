import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "./ui/button";

export const UploadPDF = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const onSubmit = async () => {
    if (!file) {
      setUploadStatus("Selecione um arquivo para upload.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const response = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadStatus("Upload realizado com sucesso!");
      console.log(response.data);
    } catch (error) {
      setUploadStatus("Erro ao realizar upload.");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Upload do Histórico Escolar</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="file"
          accept=".pdf"
          {...register("pdf", { required: true })}
          onChange={onFileChange}
        />
        {errors.pdf && <p>O upload de um arquivo é obrigatório.</p>}
        <Button type="submit">Enviar PDF</Button>
      </form>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

