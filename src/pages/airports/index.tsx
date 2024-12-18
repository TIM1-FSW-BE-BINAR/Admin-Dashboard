import { AlertModal } from '@/components/shared/alert-modal';
import DataTable from '../../components/shared/data-table';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import Heading from '@/components/shared/heading';
import PopupModal from '@/components/shared/popup-modal';
import { Button } from '@/components/ui/button';
import { airportsService } from '../../services/airport';
import { TAirports, TAirportsCreate } from '@/types/airports';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash } from 'lucide-react';
import { useState } from 'react';
import { AirportsForm } from '../../components/airports/airports-form';
import EditModal from '@/components/shared/edit-modal';

export default function AirportsPage() {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editData, setEditData] = useState<TAirports | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data: airports, isLoading } = useQuery({
    queryKey: ['airports'],
    queryFn: airportsService.getAll
  });

  const createMutation = useMutation({
    mutationFn: airportsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['airports'] });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: TAirportsCreate }) =>
      airportsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['airports'] });
      setEditData(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: airportsService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['airports'] });
      setDeleteId(null);
    }
  });

  const columns: ColumnDef<TAirports>[] = [
    {
      accessorKey: 'code',
      header: 'Kode Bandara'
    },
    {
      accessorKey: 'name',
      header: 'Nama Bandara'
    },
    {
      accessorKey: 'city',
      header: 'Kota Bandara'
    },
    {
      accessorKey: 'state',
      header: 'State Bandara'
    },
    {
      accessorKey: 'country',
      header: 'Negara Bandara'
    },
    {
      accessorKey: 'timezone',
      header: 'Timezone Bandara'
    },
    {
      accessorKey: 'latitude',
      header: 'Latitude Bandara'
    },
    {
      accessorKey: 'longitude',
      header: 'Longitude Bandara'
    },
    {
      accessorKey: 'elevation',
      header: 'Elevation Bandara'
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
        <Heading title="Airports" description="Kelola data bandara" />
        <PopupModal
          renderModal={(onClose) => (
            <div className="p-6">
              <Heading
                title="Tambah Bandara"
                description="Tambah data Bandara baru"
              />
              <AirportsForm
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

      <DataTable columns={columns} data={airports || []} pageCount={1} />

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
            <Heading title="Edit Bandara" description="Edit data bandara" />
            <AirportsForm
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
