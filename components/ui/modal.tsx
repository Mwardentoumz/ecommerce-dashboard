"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./dialog"

interface ModalProps {
    title: string
    description: string
    onClose: () => void
    isOpen: boolean
    children?: React.ReactNode
}

export const Modal = ({ title, description, onClose, isOpen, children }: ModalProps) => {
    

        const onChange = (open: boolean) => {
            if (!open) {
                onClose()
            }
        }
        
    return (
        <Dialog
            open={isOpen}
            onOpenChange={onChange}

        > 
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <div>
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    )
}

