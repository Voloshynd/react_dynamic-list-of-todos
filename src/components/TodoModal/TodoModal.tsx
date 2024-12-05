import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import * as api from '../../api'

type Props = {
  selectedTodo: Todo | null,
  handleCloseModal: ()=> void,
}

export const TodoModal: React.FC<Props> = React.memo(({ selectedTodo, handleCloseModal }) => {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (!selectedTodo) {
      setUser(null);
      setLoading(false);
      return;
    }

    api.getUser(selectedTodo.userId).then(setUser);
  }, [selectedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading && !user? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setUser(null);
                setLoading(true);
                handleCloseModal()
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={`has-text${selectedTodo?.completed ? '-success' : '-danger'}`}
              >
                {selectedTodo?.completed ? 'Done' : 'Planned'}
              </strong>
              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
});
