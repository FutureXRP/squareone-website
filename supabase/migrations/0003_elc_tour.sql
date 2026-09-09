-- Add the ELC tour request form kind.
alter table form_submissions drop constraint form_submissions_kind_check;
alter table form_submissions add constraint form_submissions_kind_check
  check (kind in ('contact','elc-enrollment','elc-tour'));
