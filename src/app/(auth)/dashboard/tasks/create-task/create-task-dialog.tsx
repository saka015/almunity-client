'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React, { useState } from 'react';
import { useCreateTaskMutation } from '@/redux/api/task';
import toast from 'react-hot-toast';

interface CreateTaskProps {
  refetch: () => void; // Define the type for refetch
}

const CreateTask: React.FC<CreateTaskProps> = ({ refetch }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [createTask, { isLoading, error }] = useCreateTaskMutation();
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await createTask({ title, description, price }).unwrap();
      setTitle('');
      setDescription('');
      setPrice(0);
      toast.success('Task Created!');
      refetch();
      setIsOpen(false);
    } catch (err) {
      console.error('Failed to create task: ', err);
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            className="border border-gray-500 bg-emerald-700 text-white max-w-sm rounded p-4 outline-none"
            onClick={() => setIsOpen(true)}
          >
            Create a task
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[800px] bg-emerald-800 border-gray-600 text-white">
          <DialogHeader>
            <DialogTitle>Create a new task</DialogTitle>
            <DialogDescription>Fill in the details for your new task.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                placeholder="Task title"
                className="col-span-3 bg-emerald-700 text-white border-gray-600"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="desc" className="text-right">
                Description
              </Label>
              <Textarea
                id="desc"
                placeholder="Short description"
                className="col-span-3 bg-emerald-700 text-white border-gray-600 max-h-96 overflow-scroll"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price (₹)
              </Label>
              <Input
                id="price"
                type="number"
                placeholder="e.g. 1000"
                className="col-span-3 bg-emerald-700 text-white border-gray-600"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
              />
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-emerald-700 text-white" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTask;
