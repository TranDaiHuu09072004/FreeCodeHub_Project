import { useState, useEffect } from "react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

const CreateLesson = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    courseId: "",
    title: "",
    description: "",
    videoId: "",
    videoUrl: "",
    order: 1,
    duration: "",
  });

  const ApiUrl = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    // Fetch courses for the dropdown
    async function fetchCourses() {
      const res = await fetch(`${ApiUrl}/courses`);
      const data = await res.json();
      // setCourses(data);
      console.log("data", data);
    }
    fetchCourses();
  }, []);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Submit form data (You can replace this with your API call)
    console.log(formData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Thêm bài học</Button>
      </DialogTrigger>
      <DialogContent maxWidth="max-w-xl">
        <DialogHeader>
          <DialogTitle>Thêm bài học mới</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Label>Tiêu đề</Label>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Nhập tiêu đề"
          />

          <Label>Mô tả</Label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Nhập mô tả"
          />

          <Label>Video ID</Label>
          <Input
            name="videoId"
            value={formData.videoId}
            onChange={handleChange}
            placeholder="Nhập ID video"
          />

          <Label>Video URL</Label>
          <Input
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleChange}
          />

          <Label>Thứ tự</Label>
          <Input
            type="number"
            name="order"
            value={formData.order}
            onChange={handleChange}
            required
          />

          <Label>Thời lượng</Label>
          <Input
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="HH:MM"
            type="text"
          />

          <DialogFooter>
            <Button type="submit">Lưu</Button>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Hủy
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLesson;
