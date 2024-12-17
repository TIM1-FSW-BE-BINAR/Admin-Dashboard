import { Dialog, DialogContent } from '@/components/ui/dialog';

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
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
