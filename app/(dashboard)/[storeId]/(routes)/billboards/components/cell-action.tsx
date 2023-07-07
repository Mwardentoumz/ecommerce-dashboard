"use client"

import { toast } from "react-hot-toast"
import { useRouter, useParams } from "next/navigation"
import { useState } from "react"
import axios from "axios"

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import { BillboardColumn } from "./columns"
import { Button } from "@/components/ui/button"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { AlertModal } from "@/components/modals/alert-modal"


interface CellActionProps{
    data:BillboardColumn
}




export const CellAction: React.FC<CellActionProps> = ({data}) => {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter()
    const params = useParams()

    const onCopy = (id:string) => {
        navigator.clipboard.writeText(id)
        toast.success("Billboard ID copied to clipboard")
    }

    const onDelete = async () => {
        try {
          setLoading(true);
          await axios.delete(`/api/${params.storeId}/billboards/${data.id}`);
          router.refresh();
          router.push(`/${params.storeId}/billboards`);
          toast.success('Billboard deleted.');
        } catch (error: any) {
          toast.error('Make sure you removed all categories using this billboard first.');
        } finally {
          setLoading(false);
          setOpen(false);
        }
      }

    return (

        

        <div>
            <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading}/>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-8 h-8 p-0">
                        <span className="sr-only">Open Menu</span>
                        <MoreHorizontal className="h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        Actions
                    </DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/billboards/${data.id}`)}>
                        <Edit className="mr-2 h-4 w-4"/>
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onCopy(data.id)}>
                        <Copy className="mr-2 h-4 w-4"/>
                        Copy
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className="mr-2 h-4 w-4"/>
                        Trash
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}