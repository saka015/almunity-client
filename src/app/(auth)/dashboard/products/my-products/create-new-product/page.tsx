'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useCreateProductMutation } from '@/redux/api/product';
import Loader from '@/app/components/Loader';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface FormData {
  title: string;
  description: string;
  price: string;
  duration: string;
  meetLink: string;
  productType: 'session' | 'product';
  productLink?: string;
}

export default function CreateNewProduct() {
  const router = useRouter();
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    price: '',
    duration: '30',
    meetLink: '',
    productType: 'session',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [createProduct, { isLoading }] = useCreateProductMutation();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const productData = {
        ...formData,
        availableDates: availableDates.map((date) => date.toISOString()),
        price: Number(formData.price),
        duration: Number(formData.duration),
        productType: formData.productType as 'session' | 'product',
      };

      const response = await createProduct(productData).unwrap();
      console.log('Product created:', response);

      setFormData({
        title: '',
        description: '',
        price: '',
        duration: '30',
        meetLink: '',
        productType: 'session',
      });
      setAvailableDates([]);
      toast.success('Product created successfully!');
      router.push('/dashboard/products/my-products');
    } catch (error) {
      console.error('Failed to create product:', error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto container max-w-2xl space-y-6 bg-slate-900 p-6 rounded-2xl shadow-xl text-white"
    >
      <h2 className="text-2xl font-bold text-cyan-400">Create a Product</h2>

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="bg-slate-800 text-white border-cyan-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="bg-slate-800 text-white border-cyan-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Price (₹)</Label>
        <Input
          id="price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          required
          className="bg-slate-800 text-white border-cyan-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="duration">Duration</Label>
        <select
          id="duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          className="w-full bg-slate-800 text-white border border-cyan-500 rounded-md p-2"
        >
          <option value="15">15 minutes</option>
          <option value="30">30 minutes</option>
          <option value="45">45 minutes</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="meetLink">Meeting Link</Label>
        <Input
          id="meetLink"
          name="meetLink"
          type="url"
          value={formData.meetLink}
          onChange={handleChange}
          className="bg-slate-800 text-white border-cyan-500"
        />
      </div>

      <div className="space-y-2 max-w-fit w-fit">
        <Label>Available Dates</Label>
        <Calendar
          mode="multiple"
          selected={availableDates}
          onSelect={(dates) => dates && setAvailableDates(dates)}
          className="rounded-md border bg-slate-800 text-white border-cyan-500 "
        />
        <p className="text-sm text-slate-400 max-w-64">
          {availableDates.length
            ? availableDates.map((d) => format(d, 'PPP')).join(', ')
            : 'No dates selected'}
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="productType">Product Type</Label>
        <select
          id="productType"
          name="productType"
          value={formData.productType}
          onChange={handleChange}
          required
          className="w-full bg-slate-800 text-white border border-cyan-500 rounded-md p-2"
        >
          <option value="session">Session</option>
          <option value="product">Product</option>
        </select>
      </div>

      {formData.productType === 'product' && (
        <div className="space-y-2">
          <Label htmlFor="productLink">Product Link</Label>
          <Input
            id="productLink"
            name="productLink"
            type="url"
            value={formData.productLink}
            onChange={handleChange}
            placeholder="Put google drive link/any other public link"
            className="bg-slate-800 text-white border-cyan-500"
          />
        </div>
      )}

      <Button
        type="submit"
        className="bg-cyan-500 hover:bg-cyan-600 text-white w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Creating...' : 'Create Product'}
      </Button>
    </form>
  );
}
