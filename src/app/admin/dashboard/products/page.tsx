"use client";
import { SectionCards } from "@/components/section-cards";
import React from "react";
import ProductTabale from "@/components/productTable";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type ProductFormData = {
  title: string;
  description: string;
  price: number;
  discountPrice: number;
  image: string;
  stock: number;
};

export default function page() {
  const [open, setOpen] = React.useState(false);
  const [loadding, setLoading] = React.useState(false);
  const handleSubmit = async (e:any) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const title = formData.get("title");
    const description = formData.get("discription");
    const price = formData.get("price");
    const discountPrice = formData.get("discountPrice");
    const image = formData.get("image");
    const stock = formData.get("stock");
    try {
      const response = await fetch("/api/products/createproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          price,
          discountPrice,
          image,
          stock,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const data = await response.json();
      setOpen(false); 
      toast.success(`Product added successfully! Title: ${data.title}`);
      
      // Optionally, you can reset the form or show a success message here
      // e.currentTarget.reset();
      
    } catch (error) {
      console.error("Error adding product:", error);
      
    }


 
  };

  // console.log("Products fetched successfully:", prodata);
  const [stats, setStats] = React.useState([]); 
  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/products/status");
        if (!response.ok) {
          throw new Error("Failed to fetch stats");
        }
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);


  return (
    <div className=" mt-4">
      <div className="px-4 lg:px-6 mb-3">
        <h1 className="text-2xl font-semibold">Products</h1>
        <p className="text-muted-foreground">
          Manage your products and inventory.
        </p>
      </div>
      <div className="px-4 lg:px-6 mb-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SectionCards stats={stats} />
      </div>
      <div className=" lg:px-6 mt-5">
   
        <div className="flex justify-end">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
      
              <Button variant="outline">Add Product</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] p-0">
              <form onSubmit={handleSubmit} >
                <div className=" max-h-[600px] overflow-y-auto p-2">
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogDescription>
                      Fill in the details below to add a new product to your
                      inventory.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 mb-4">
                    <div className="grid gap-3">
                      <Label htmlFor="title">title</Label>
                      <Input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter product title"
                        required
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="discription">Discription</Label>
                      <Textarea
                        id="discription"
                        name="discription"
                        placeholder="Enter product description"
                        required
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="price">Price</Label>
                      <Input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="Enter product price"
                        required
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="discountPrice">Discount Price</Label>
                      <Input
                        type="number"
                        id="discountPrice"
                        name="discountPrice"
                        placeholder="Enter product discount price"
                        required
                      />
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="image">Image URL</Label>
                      <Input
                        type="text"
                        id="image"
                        name="image"
                        placeholder="Enter product image URL"
                        required
                      />
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="stock">Stock</Label>
                      <Input
                        type="number"
                        id="stock"
                        name="stock"
                        placeholder="Enter product stock quantity"
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" onSubmit={handleSubmit} className=" cursor-pointer">
                      {loadding ? (
                        <Loader2 className="animate-spin w-4 h-4 mr-2" />
                      ) : "Add Product"}
                      
                    </Button>
                  </DialogFooter>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <ProductTabale />
    </div>
  );
}
