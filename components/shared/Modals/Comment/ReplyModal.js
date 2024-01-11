import { useState } from "react";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

import { createComment, updateComment } from "/services/commentServices";

import FormModal from "/components/shared/Modals/Form";
import TextForm from "/components/shared/Forms/Text";
import FileForm from "/components/shared/Forms/File";

export default function ReplyCommentModal({
  success,
  sx,
  comment,
  isEdit,
  commentReply,
}) {
  const params = useParams();
  const user = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    projectId: comment?.projectId ?? "",
    projectTaskId: comment?.projectTaskId ?? "",
    replyCommentId: comment?.id ?? "",
    userId: user?.id ?? "",
    content: isEdit ? commentReply?.content : "",
    contentError: { hasError: false, label: "" },
  });

  const validateInput = (field, value) => {
    switch (field) {
      case "content":
        return value.trim() === "" ? "Không thể để trống" : "";
      // Add validation for other fields as needed
      default:
        return "";
    }
  };

  const handleInputChange = (field, value) => {
    const errorLabel = validateInput(field, value);
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
      [`${field}Error`]: { hasError: !!errorLabel, label: errorLabel },
    }));
  };

  const handleSendComment = async () => {
    try {
      isEdit
        ? await updateComment(commentReply?.id, formData, params.id)
        : await createComment(formData, params.id);
      toast.success("Đã gửi phản hồi!");
      if (typeof success === "function") success();
    } catch (error) {
      toast.error("Lỗi gửi phản hồi!");
    }
  };

  return (
    <FormModal
      sx={sx}
      title="Tạo phản hồi bình luận"
      buttonLabel={`${isEdit ? "Sửa" : "Trả lời"}`}
      submitLabel="Trả lời"
      onSubmit={handleSendComment}
    >
      <Grid item xs={12} lg={12}>
        <TextForm
          multiline
          rows={4}
          title="Nội dung"
          required
          value={formData.content}
          onChange={(e) => handleInputChange("content", e.target.value)}
          subtitle="Phản hồi bình luận của khách hàng"
        ></TextForm>
      </Grid>
    </FormModal>
  );
}
