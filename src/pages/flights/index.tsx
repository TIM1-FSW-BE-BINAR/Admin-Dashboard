import { AlertModal } from '@/components/shared/alert-modal';
import DataTable from '../../components/shared/data-table';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import Heading from '@/components/shared/heading';
import PopupModal from '@/components/shared/popup-modal';
import { Button } from '@/components/ui/button';
import { flightsService } from '@/services/flight';
import { airlinesService } from '@/services/airline';
import { airportsService } from '@/services/airport';
import { TFlights, TFlightCreate } from '@/types/flights';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash } from 'lucide-react';
import { useState } from 'react';
import { FlightsForm } from '@/components/flights/flights-form';
import EditModal from '@/components/shared/edit-modal';

export default function FlightsPage() {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editData, setEditData] = useState<TFlights | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data: flights, isLoading } = useQuery({
    queryKey: ['flights'],
    queryFn: flightsService.getAll
  });

  const { data: airlines } = useQuery({
    queryKey: ['airlines'],
    queryFn: airlinesService.getAll
  });

  const { data: airports } = useQuery({
    queryKey: ['airports'],
    queryFn: airportsService.getAll
  });

  const createMutation = useMutation({
    mutationFn: flightsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flights'] });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: TFlightCreate }) =>
      flightsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flights'] });
      setEditData(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: flightsService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flights'] });
      setDeleteId(null);
    }
  });

  const columns: ColumnDef<TFlights>[] = [
    {
      accessorKey: 'flightNumber',
      header: 'Flight Number'
    },
    {
      accessorKey: 'airlineId',
      header: 'Airline',
      cell: ({ row }) => {
        const airline = airlines?.find(
          (airline) => airline.id === row.original.airlineId
        );
        return airline ? airline.name : 'Unknown Airline';
      }
    },
    {
      accessorKey: 'departureAirport',
      header: 'Departure Airport',
      cell: ({ row }) => {
        const airport = airports?.find(
          (airport) => airport.id === row.original.departureAirport
        );
        return airport ? airport.name : 'Unknown Airport';
      }
    },

    {
      accessorKey: 'departureTime',
      header: 'Departure Time',
      cell: ({ row }) => new Date(row.original.departureTime).toLocaleString()
    },
    {
      accessorKey: 'arrivalAirport',
      header: 'Arrival Airport',
      cell: ({ row }) => {
        const airport = airports?.find(
          (airport) => airport.id === row.original.arrivalAirport
        );
        return airport ? airport.name : 'Unknown Airport';
      }
    },
    {
      accessorKey: 'arrivalTime',
      header: 'Arrival Time',
      cell: ({ row }) => new Date(row.original.arrivalTime).toLocaleString()
    },
    {
      accessorKey: 'terminal',
      header: 'Terminal'
    },
    {
      accessorKey: 'information',
      header: 'Information'
    },

    {
      accessorKey: 'price',
      header: 'Price'
    },
    {
      accessorKey: 'class',
      header: 'Class'
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
              <FlightsForm
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

      <DataTable columns={columns} data={flights || []} pageCount={1} />

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
            <FlightsForm
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
