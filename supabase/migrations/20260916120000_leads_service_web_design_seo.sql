/*
  # Expand leads.service allowed values

  Issue #6 — contact form dropdown adds Web Design and SEO.

  - Drop existing valid_service check
  - Recreate with prior three services plus Web Design and SEO
*/

ALTER TABLE leads DROP CONSTRAINT IF EXISTS valid_service;

ALTER TABLE leads ADD CONSTRAINT valid_service CHECK (
  service IN (
    'Lead Generation',
    'Chatbot Development',
    'Workflow Automation',
    'Web Design',
    'SEO'
  )
);
