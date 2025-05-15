/*
  # Add service field to leads table

  1. Changes
    - Add service field to leads table with default value
    - Make service field mandatory after setting default
    - Add check constraint for valid services
*/

-- First add the column with a default value
ALTER TABLE leads ADD COLUMN service text DEFAULT 'Lead Generation';

-- Update any existing NULL values to use the default
UPDATE leads SET service = 'Lead Generation' WHERE service IS NULL;

-- Now make the column NOT NULL
ALTER TABLE leads ALTER COLUMN service SET NOT NULL;

-- Add check constraint to ensure only valid services are inserted
ALTER TABLE leads ADD CONSTRAINT valid_service CHECK (
  service IN ('Lead Generation', 'Chatbot Development', 'Workflow Automation')
);