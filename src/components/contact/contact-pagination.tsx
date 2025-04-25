import { ButtonGroup, IconButton, Pagination } from '@chakra-ui/react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

interface ContactPaginationProps {
  count: number;
  pageSize: number;
  page: number;
  onPageChange: (page: number) => void;
}

export default function ContactPagination({
  count,
  pageSize,
  page,
  onPageChange,
}: ContactPaginationProps) {
  return (
    <Pagination.Root
      count={count}
      pageSize={pageSize}
      page={page}
      onPageChange={(e) => onPageChange(e.page)}
    >
      <ButtonGroup variant={'subtle'} size={'sm'} colorPalette={'green'}>
        <Pagination.PrevTrigger asChild>
          <IconButton>
            <LuChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>

        <Pagination.Items
          render={(page) => (
            <IconButton variant={{ base: 'ghost', _selected: 'solid' }}>
              {page.value}
            </IconButton>
          )}
        />

        <Pagination.NextTrigger asChild>
          <IconButton>
            <LuChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  );
}
