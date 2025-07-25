"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/trpc/react";
import { useForm } from "react-hook-form";

type FormInput = {
  repoUrl: string;
  projectName: string;
  githubToken?: string;
};

const CreatePage = () => {
  const { register, handleSubmit, reset } = useForm<FormInput>();
  const createProject = api.project.createProject.useMutation();

  function onSubmit(data: FormInput) {
    window.alert(JSON.stringify(data, null, 2));
    createProject.mutate({
      githubUrl: data.repoUrl,
      name: data.projectName,
      githubToken: data.githubToken,
    });
    return true;
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Card className="w-[500px]">
        <CardHeader className="text-center">
          <CardTitle>Link your Github Repo</CardTitle>
          <CardDescription>Enter the URL of your Github Repo</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Input
              {...register("projectName", { required: true })}
              placeholder="Project Name"
              className="border border-zinc-300 placeholder:text-zinc-500 dark:border-zinc-600"
              required
            />
            <Input
              {...register("repoUrl", { required: true })}
              placeholder="Github Repo URL"
              type="url"
              className="border border-zinc-300 placeholder:text-zinc-500 dark:border-zinc-600"
              required
            />
            <Input
              {...register("githubToken")}
              placeholder="Github Token (optional)"
              className="border border-zinc-300 placeholder:text-zinc-500 dark:border-zinc-600"
            />

            <Button type="submit">Create Project</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePage;
