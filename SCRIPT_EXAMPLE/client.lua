
CreateThread(function()
    Wait(100)

    -- Setup resourceName
    SendNuiMessage({
        action = "SET_RESOURCE_NAME",
        data = {
            resourceName = GetCurrentResourceName()
        }
    })
end)

--- FIRST METHOD
RegisterCommand('setup', function(source, args)
    local number = tonumber(args[1])
    SendNuiMessage({
        action = "TEST_FIRST_METHOD",
        data = {
            number = number
        }
    })
end)

--- SECOND METHOD
RegisterCommand('setup2', function(source, args)
    local number = tonumber(args[1])
    SendNuiMessage({
        action = "TEST_SECOND_METHOD",
        data = {
            number = GetCurrentResourceName()
        }
    })
end)



RegisterNUICallback('sendMethodsToClient', function(data, cb)
    local firstMethodNumber = data.firstMethod
    local secondMethodNumber = data.secondMethod

    print("FM: ", firstMethodNumber, "SM; ", secondMethodNumber)

    return cb("ok!")
end)