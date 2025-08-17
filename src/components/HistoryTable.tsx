import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { History, Clock, Calendar, Hash } from "lucide-react";
interface DrawRecord {
  id: string;
  draw_id: string;
  date: string;
  time: string;
  number: number;
  created_at: string;
}

interface HistoryTableProps {
  data: DrawRecord[];
}

export const HistoryTable = ({ data }: HistoryTableProps) => {
  const getTimeIcon = (time: string) => {
    switch (time) {
      case 'Morning': return '🌅';
      case 'Midday': return '☀️';
      case 'Afternoon': return '🌤️';
      case 'Evening': return '🌙';
      default: return '⏰';
    }
  };

  const getTimeBadgeVariant = (time: string) => {
    switch (time) {
      case 'Morning': return 'secondary';
      case 'Midday': return 'default';
      case 'Afternoon': return 'secondary';
      case 'Evening': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <Card className="bg-gradient-card border-border/50 shadow-card w-full">
      <div className="p-3 sm:p-6">
        <div className="flex items-center gap-2 mb-6">
          <History className="w-6 h-6 text-primary" />
          <h3 className="text-2xl font-bold">Draw History</h3>
          <Badge variant="outline" className="ml-auto">
            {data.length} records
          </Badge>
        </div>

        <div className="rounded-lg border border-border/50 overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead className="w-20 sm:w-24 text-xs sm:text-sm">
                  Draw #
                </TableHead>
                <TableHead className="text-xs sm:text-sm">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Date</span>
                  </div>
                </TableHead>
                <TableHead className="text-xs sm:text-sm">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Time</span>
                  </div>
                </TableHead>
                <TableHead className="text-right text-xs sm:text-sm">Number</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data
                .sort((a, b) => {
                  const aNum = parseInt(a.draw_id.replace('D', '')) || 0;
                  const bNum = parseInt(b.draw_id.replace('D', '')) || 0;
                  return bNum - aNum;
                })
                .slice(0, 100).map((record) => (
                <TableRow key={record.id} className="border-border/50 hover:bg-muted/30">
                  <TableCell className="font-medium text-xs sm:text-sm p-2 sm:p-4">
                    {record.draw_id}
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm p-2 sm:p-4">{record.date}</TableCell>
                  <TableCell className="p-2 sm:p-4">
                    <Badge variant={getTimeBadgeVariant(record.time)} className="text-xs px-1 sm:px-2">
                      <span className="sm:hidden">{getTimeIcon(record.time)}</span>
                      <span className="hidden sm:inline">{getTimeIcon(record.time)} {record.time}</span>
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right p-2 sm:p-4">
                    <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 text-primary font-bold text-xs sm:text-base">
                      {record.number}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {data.length > 100 && (
          <div className="text-center mt-4 text-sm text-muted-foreground">
            Showing latest 100 records of {data.length} total
          </div>
        )}
      </div>
    </Card>
  );
};