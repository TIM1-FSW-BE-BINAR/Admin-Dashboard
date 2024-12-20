import { AlertModal } from '@/components/shared/alert-modal';
import DataTable from '../../components/shared/data-table';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import Heading from '@/components/shared/heading';
import PopupModal from '@/components/shared/popup-modal';
import { Button } from '@/components/ui/button';
import { airlinesService } from '../../services/airline';
import { TAirlines, TAirlinesCreate } from '@/types/airlines';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash } from 'lucide-react';
import { useState } from 'react';
import { AirlinesForm } from '../../components/airlines/airlines-form';
import EditModal from '@/components/shared/edit-modal';

export default function AirlinesPage() {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editData, setEditData] = useState<TAirlines | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data: airlines, isLoading } = useQuery({
    queryKey: ['airlines'],
    queryFn: airlinesService.getAll
  });

  const createMutation = useMutation({
    mutationFn: airlinesService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['airlines'] });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: TAirlinesCreate }) =>
      airlinesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['airlines'] });
      setEditData(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: airlinesService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['airlines'] });
      setDeleteId(null);
    }
  });

  const columns: ColumnDef<TAirlines>[] = [
    {
      accessorKey: 'name',
      header: 'Nama Maskapai'
    },
    {
      accessorKey: 'imageUrl',
      header: 'Logo',
      cell: ({ row }) => (
        <img
          src={row.original.imageUrl}
          alt={row.original.name}
          className="h-10 w-10 object-contain"
        />
      )
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setEditData(row.original);
              setIsEditModalOpen(true);
            }}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDeleteId(row.original.id)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  if (isLoading) return <DataTableSkeleton columnCount={3} />;

  return (
    <div className="space-y-4 p-8">
      <div className="flex items-center justify-between">
        <Heading title="Airlines" description="Kelola data maskapai" />
        <PopupModal
          renderModal={(onClose) => (
            <div className="p-6">
              <Heading
                title="Tambah Maskapai"
                description="Tambah data maskapai baru"
              />
              <AirlinesForm
                onSubmit={async (data) => {
                  await createMutation.mutateAsync(data);
                  onClose();
                }}
                loading={createMutation.isPending}
              />
            </div>
          )}
        />
      </div>

      <DataTable columns={columns} data={airlines || []} />

      <AlertModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        loading={deleteMutation.isPending}
      />

      {editData && (
        <EditModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditData(null);
          }}
        >
          <div className="p-6">
            <Heading title="Edit Maskapai" description="Edit data maskapai" />
            <AirlinesForm
              initialData={editData}
              onSubmit={async (data) => {
                await updateMutation.mutateAsync({
                  id: editData.id,
                  data
                });
                setIsEditModalOpen(false);
                setEditData(null);
              }}
              loading={updateMutation.isPending}
            />
          </div>
        </EditModal>
      )}
    </div>
  );
}
