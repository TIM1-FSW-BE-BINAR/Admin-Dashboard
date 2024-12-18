import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ScrollArea } from '../ui/scroll-area';

type TEditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function EditModal({
  isOpen,
  onClose,
  children
}: TEditModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <ScrollArea className="max-h-[80vh]">{children}</ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
