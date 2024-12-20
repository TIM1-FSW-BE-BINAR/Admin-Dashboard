import { AlertModal } from '@/components/shared/alert-modal';
import DataTable from '../../components/shared/data-table';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import Heading from '@/components/shared/heading';
import PopupModal from '@/components/shared/popup-modal';
import { Button } from '@/components/ui/button';
import { notificationsService } from '../../services/notifications';
import { usersService } from '../../services/users';
import { TNotifications, TNotificationsCreate } from '@/types/notifications';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash } from 'lucide-react';
import { useState } from 'react';
import { NotificationsForm } from '../../components/notifications/notifications-form';
import EditModal from '@/components/shared/edit-modal';

export default function NotificationsPage() {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editData, setEditData] = useState<TNotifications | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data: notifications, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: notificationsService.getAll
  });

  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: usersService.getAll
  });

  const createMutation = useMutation({
    mutationFn: notificationsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: TNotificationsCreate }) =>
      notificationsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      setEditData(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: notificationsService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      setDeleteId(null);
    }
  });

  const columns: ColumnDef<TNotifications>[] = [
    {
      accessorKey: 'title',
      header: 'Judul'
    },
    {
      accessorKey: 'description',
      header: 'Deskripsi'
    },
    {
      accessorKey: 'type',
      header: 'Tipe'
    },
    {
      accessorKey: 'userId',
      header: 'Penerima',
      cell: ({ row }) => {
        const userId = row.original.userId;
        if (!userId) return 'Global';

        const user = users.find((u) => u.id === Number(userId));
        return user ? user.email : userId.toString();
      }
    },
    {
      accessorKey: 'isRead',
      header: 'Sudah Dibaca',
      cell: ({ row }) => (row.original.isRead ? 'Ya' : 'Tidak')
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

  if (isLoading) return <DataTableSkeleton columnCount={5} />;

  return (
    <div className="space-y-4 p-8">
      <div className="flex items-center justify-between">
        <Heading title="Notifikasi" description="Kelola data notifikasi" />
        <PopupModal
          renderModal={(onClose) => (
            <div className="p-6">
              <Heading
                title="Tambah Notifikasi"
                description="Tambah data notifikasi baru"
              />
              <NotificationsForm
                users={users}
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

      <DataTable
        columns={columns}
        data={notifications || []}
        pagination={{
          pageSize: 10,
          pageIndex: 0,
          pageCount: 1
        }}
      />

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
              title="Edit Notifikasi"
              description="Edit data notifikasi"
            />
            <NotificationsForm
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
              users={users}
            />
          </div>
        </EditModal>
      )}
    </div>
  );
}
