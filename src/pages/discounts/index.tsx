import { AlertModal } from '@/components/shared/alert-modal';
import DataTable from '../../components/shared/data-table';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import Heading from '@/components/shared/heading';
import PopupModal from '@/components/shared/popup-modal';
import { Button } from '@/components/ui/button';
import { discountsService } from '@/services/discount';
import { TDiscounts, TDiscountCreate } from '@/types/discounts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash } from 'lucide-react';
import { useState } from 'react';
import { DiscountsForm } from '@/components/discounts/discounts-form';
import EditModal from '@/components/shared/edit-modal';

export default function DiscountsPage() {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editData, setEditData] = useState<TDiscounts | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data: airlines, isLoading } = useQuery({
    queryKey: ['discount'],
    queryFn: discountsService.getAll
  });

  const createMutation = useMutation({
    mutationFn: discountsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discount'] });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: TDiscountCreate }) =>
      discountsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discount'] });
      setEditData(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: discountsService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discount'] });
      setDeleteId(null);
    }
  });

  const columns: ColumnDef<TDiscounts>[] = [
    {
      accessorKey: 'name',
      header: 'Discount Name'
    },
    {
      accessorKey: 'type',
      header: 'Type'
    },
    {
      accessorKey: 'value',
      header: 'Value'
    },
    {
      accessorKey: 'startDate',
      header: 'Start Date',
      cell: ({ row }) => new Date(row.original.startDate).toLocaleString()
    },
    {
      accessorKey: 'endDate',
      header: 'End Date',
      cell: ({ row }) => new Date(row.original.endDate).toLocaleString()
    },
    {
      accessorKey: 'minPurchase',
      header: 'Minimal Purchase'
    },
    {
      accessorKey: 'isActive',
      header: 'Active'
    },
    {
      accessorKey: 'createdAt',
      header: 'Created',
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleString()
    },
    {
      accessorKey: 'updatedAt',
      header: 'Updated',
      cell: ({ row }) => new Date(row.original.updatedAt).toLocaleString()
    },
    {
      accessorKey: 'code',
      header: 'Code'
    },
    {
      accessorKey: 'description',
      header: 'Description'
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
        <Heading title="Discounts" description="Manage Discount" />
        <PopupModal
          renderModal={(onClose) => (
            <div className="p-6">
              <Heading title="Add Discount" description="Add new dicount" />
              <DiscountsForm
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
            <Heading title="Edit Dicount" description="Edit dicount" />
            <DiscountsForm
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
