import { AlertModal } from '@/components/shared/alert-modal';
import DataTable from '../../components/shared/data-table';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import Heading from '@/components/shared/heading';
import PopupModal from '@/components/shared/popup-modal';
import { Button } from '@/components/ui/button';
import { seatsService } from '../../services/seats';
import { TSeats, TSeatsCreate } from '@/types/seats';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash } from 'lucide-react';
import { useState } from 'react';
import { SeatsForm } from '../../components/seats/seats-form';
import EditModal from '@/components/shared/edit-modal';

export default function SeatsPage() {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editData, setEditData] = useState<TSeats | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data: seats, isLoading } = useQuery({
    queryKey: ['seats'],
    queryFn: seatsService.getAll
  });

  const createMutation = useMutation({
    mutationFn: seatsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seats'] });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: TSeatsCreate }) =>
      seatsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seats'] });
      setEditData(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: seatsService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seats'] });
      setDeleteId(null);
    }
  });

  const columns: ColumnDef<TSeats>[] = [
    {
      accessorKey: 'flightId',
      header: 'ID Penerbangan'
    },
    {
      accessorKey: 'seatNumber',
      header: 'Nomor Kursi'
    },
    {
      accessorKey: 'status',
      header: 'Status'
    },
    {
      accessorKey: 'departureTime',
      header: 'Waktu Keberangkatan'
    },
    {
      accessorKey: 'arrivalTime',
      header: 'Waktu Kedatangan'
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

  if (isLoading) return <DataTableSkeleton columnCount={6} />;

  return (
    <div className="space-y-4 p-8">
      <div className="flex items-center justify-between">
        <Heading
          title="Data Kursi Penerbangan"
          description="Kelola data kursi penerbangan"
        />
        <PopupModal
          renderModal={(onClose) => (
            <div className="p-6">
              <Heading
                title="Tambah Kursi"
                description="Tambah data kursi penerbangan baru"
              />
              <SeatsForm
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

      <DataTable columns={columns} data={seats || []} pageCount={1} />

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
            <Heading
              title="Edit Kursi"
              description="Edit data kursi penerbangan"
            />
            <SeatsForm
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
