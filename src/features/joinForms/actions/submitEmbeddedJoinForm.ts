'use server';

import Iron from '@hapi/iron';
import { headers } from 'next/headers';

import BackendApiClient from 'core/api/client/BackendApiClient';
import { EmbeddedJoinFormData, EmbeddedJoinFormStatus } from '../types';

export default async function submitJoinForm(
  prevState: EmbeddedJoinFormStatus,
  inputFormData: FormData
) {
  const headersList = headers();
  const headersEntries = headersList.entries();
  const headersObject = Object.fromEntries(headersEntries);
  const apiClient = new BackendApiClient(headersObject);

  const encrypted = inputFormData.get('__joinFormData')?.toString() || '';
  const joinFormInfo = (await Iron.unseal(
    encrypted,
    process.env.SESSION_PASSWORD || '',
    Iron.defaults
  )) as EmbeddedJoinFormData;

  const outputFormData: Record<string, string | null> = {};

  joinFormInfo.fields.forEach((field) => {
    const value = inputFormData.get(field.s)?.toString() || '';
    if (field.s == 'gender' && value == 'unspecified') {
      outputFormData[field.s] = null;
    } else {
      outputFormData[field.s] = value;
    }
  });

  await apiClient.post(
    `/api/orgs/${joinFormInfo.orgId}/join_forms/${joinFormInfo.formId}/submissions`,
    {
      form_data: outputFormData,
      submit_token: joinFormInfo.token,
    }
  );

  return 'submitted';
}
