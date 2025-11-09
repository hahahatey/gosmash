import { Organizer } from "@/mocks/types";

export const OrganizerInfo: React.FC<Organizer> = ({firstName, lastName, phone, email}) => {
  return (
    <>
      <div>
        <div className="font-medium">Организатор</div>
        <div className="text-sm text-gray-600">
          {firstName} {lastName}
        </div>
      </div>
      <div>
        <div className="font-medium">Телефон</div>
        <div className="text-sm text-gray-600">{phone}</div>
      </div>
      <div>
        <div className="font-medium">Email</div>
        <div className="text-sm text-gray-600">{email}</div>
      </div>
    </>
  );
};
