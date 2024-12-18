import PageHead from '@/components/shared/page-head.jsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs.js';
import { dashboardService } from '../../services/dashboard.ts';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { Tbookings } from '@/types/dashboard.ts';
import { TDataResponse, TApiResponse } from '@/types/dashboard.ts';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import DataTable from '../../components/shared/data-table';
import { format } from 'date-fns';

export default function DashboardPage() {
  const { data: bookings, isLoading } = useQuery({
    queryKey: ['bookings'],
    queryFn: dashboardService.getAll
  });

  const { data: dataTotal, isLoading: isLoadingDataTotal } = useQuery<
    TApiResponse<TDataResponse>
  >({
    queryKey: ['dataTotal'],
    queryFn: dashboardService.getTotal
  });

  const totalTransactions = dataTotal?.data?.totalTransactions ?? 0;
  const totalAirlines = dataTotal?.data?.totalAirlines ?? 0;
  const totalAirports = dataTotal?.data?.totalAirports ?? 0;
  const totalFlights = dataTotal?.data?.totalFlights ?? 0;
  const totalUsers = dataTotal?.data?.totalUsers ?? 0;
  const totalDiscounts = dataTotal?.data?.totalDiscounts ?? 0;
  const totalNotifications = dataTotal?.data?.totalNotifications ?? 0;
  const totalBookings = dataTotal?.data?.totalBookings ?? 0;
  const totalPassengers = dataTotal?.data?.totalPassengers ?? 0;
  const totalSeats = dataTotal?.data?.totalSeats ?? 0;
  const totalTickets = dataTotal?.data?.totalTickets ?? 0;

  const columns: ColumnDef<Tbookings>[] = [
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      cell: ({ row }) => {
        const date = new Date(row.getValue('createdAt'));
        return format(date, 'yyyy-MM-dd HH:mm:ss');
      }
    },
    {
      accessorKey: 'code',
      header: 'Booking Code'
    },
    {
      accessorKey: 'flight.flightNumber',
      header: 'Flight Number'
    },
    {
      accessorKey: 'flight.class',
      header: 'Class'
    },
    {
      accessorKey: 'totalPrice',
      header: 'Total Price'
    },
    {
      accessorKey: 'status',
      header: 'Status'
    }
  ];

  if (isLoading) return <DataTableSkeleton columnCount={5} />;
  if (isLoadingDataTotal) return <DataTableSkeleton columnCount={5} />;
  return (
    <>
      <PageHead title="Dashboard | App" />
      <div className="max-h-screen flex-1 space-y-4 overflow-y-auto p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              Analytics
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Transactions
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isLoadingDataTotal ? 'Loading...' : totalTransactions}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +{totalTransactions} from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Users
                  </CardTitle>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-users h-4 w-4 text-muted-foreground"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isLoadingDataTotal ? 'Loading...' : totalUsers}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +{totalUsers} from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Airports
                  </CardTitle>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-tower-control h-4 w-4 text-muted-foreground"
                  >
                    <path d="M18.2 12.27 20 6H4l1.8 6.27a1 1 0 0 0 .95.73h10.5a1 1 0 0 0 .96-.73Z" />
                    <path d="M8 13v9" />
                    <path d="M16 22v-9" />
                    <path d="m9 6 1 7" />
                    <path d="m15 6-1 7" />
                    <path d="M12 6V2" />
                    <path d="M13 2h-2" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isLoadingDataTotal ? 'Loading...' : totalAirports}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +{totalAirports} from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Airlines
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-plane h-4 w-4 text-muted-foreground"
                  >
                    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isLoadingDataTotal ? 'Loading...' : totalAirlines}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +{totalAirlines} from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Flights
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-plane h-4 w-4 text-muted-foreground"
                  >
                    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isLoadingDataTotal ? 'Loading...' : totalFlights}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +{totalFlights} from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Bookings
                  </CardTitle>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-tickets-plane h-4 w-4 text-muted-foreground"
                  >
                    <path d="M10.5 17h1.227a2 2 0 0 0 1.345-.52L18 12" />
                    <path d="m12 13.5 3.75.5" />
                    <path d="m4.5 8 10.58-5.06a1 1 0 0 1 1.342.488L18.5 8" />
                    <path d="M6 10V8" />
                    <path d="M6 14v1" />
                    <path d="M6 19v2" />
                    <rect x="2" y="8" width="20" height="13" rx="2" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isLoadingDataTotal ? 'Loading...' : totalBookings}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +{totalBookings} from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Passengers
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-users h-4 w-4 text-muted-foreground"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isLoadingDataTotal ? 'Loading...' : totalPassengers}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +{totalPassengers} from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Seats
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-armchair h-4 w-4 text-muted-foreground"
                  >
                    <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
                    <path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z" />
                    <path d="M5 18v2" />
                    <path d="M19 18v2" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isLoadingDataTotal ? 'Loading...' : totalSeats}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +{totalSeats} from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Tickets
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-tickets-plane h-4 w-4 text-muted-foreground"
                  >
                    <path d="M10.5 17h1.227a2 2 0 0 0 1.345-.52L18 12" />
                    <path d="m12 13.5 3.75.5" />
                    <path d="m4.5 8 10.58-5.06a1 1 0 0 1 1.342.488L18.5 8" />
                    <path d="M6 10V8" />
                    <path d="M6 14v1" />
                    <path d="M6 19v2" />
                    <rect x="2" y="8" width="20" height="13" rx="2" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isLoadingDataTotal ? 'Loading...' : totalTickets}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +{totalTickets} from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Discounts
                  </CardTitle>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-badge-percent h-4 w-4 text-muted-foreground"
                  >
                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                    <path d="m15 9-6 6" />
                    <path d="M9 9h.01" />
                    <path d="M15 15h.01" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isLoadingDataTotal ? 'Loading...' : totalDiscounts}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +{totalDiscounts} from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Notifications
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-bell-plus h-4 w-4 text-muted-foreground"
                  >
                    <path d="M10.268 21a2 2 0 0 0 3.464 0" />
                    <path d="M15 8h6" />
                    <path d="M18 5v6" />
                    <path d="M20.002 14.464a9 9 0 0 0 .738.863A1 1 0 0 1 20 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 8.75-5.332" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isLoadingDataTotal ? 'Loading...' : totalNotifications}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +{totalNotifications} from last month
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-12 md:col-span-12">
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                  <CardDescription>
                    You made 20 + bookings this month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable
                    columns={columns}
                    data={bookings || []}
                    pageCount={1}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
