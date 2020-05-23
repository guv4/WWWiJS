# frozen_string_literal: true

# A module to generate a json with a response.
module Response
  def json_response(object, status = :ok)
    render json: object, status: status
  end
end