/*
  # Expand leads.service allowed values

  Add Content Creation so the contact dropdown matches the six service cards.

  - Drop existing valid_service check
  - Recreate with prior five services plus Content Creation
*/

ALTER TABLE leads DROP CONSTRAINT IF EXISTS valid_service;

ALTER TABLE leads ADD CONSTRAINT valid_service CHECK (
  service IN (
    'Lead Generation',
    'Chatbot Development',
    'Workflow Automation',
    'Web Design',
    'SEO',
    'Content Creation'
  )
);
