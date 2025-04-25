'use client';

import { Container, For, HStack, Wrap } from '@chakra-ui/react';
import ContactCard from './card/contact-card';
import NoContactFallback from './no-contact';
import ContactPagination from './contact-pagination';
import { useContact } from '../../hooks/use-contact.hook';

export default function ContactContainer() {
  const {
    contacts,
    paginated: { page, pageSize, setPage, total },
  } = useContact();

  return (
    <Container layerStyle={'fill.subtle'} shadow={'sm'} p={4} mt={2}>
      <Wrap gap={4} w={'full'} justifyContent={'center'}>
        <For each={contacts} fallback={<NoContactFallback />}>
          {(item) => <ContactCard key={item._id} contact={item} />}
        </For>
      </Wrap>
      <HStack w={'full'} justifyContent={'center'} mt={2} p={4}>
        <ContactPagination
          count={total}
          pageSize={pageSize}
          page={page}
          onPageChange={(pageNumber) => setPage(pageNumber)}
        />
      </HStack>
    </Container>
  );
}
